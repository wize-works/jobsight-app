'use server';

import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { createNewUser, getUserById, updateExistingUser } from '@/services/identity';

// Your Clerk webhook secret (should be in environment variables)
const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

export async function POST(req) {
    // Verify the webhook signature
    const payload = await req.json();
    const headersList = headers();
    const svix_id = headersList.get('svix-id');
    const svix_timestamp = headersList.get('svix-timestamp');
    const svix_signature = headersList.get('svix-signature');

    // If there's no signature or secret, this might be a misconfigured request
    if (!svix_id || !svix_timestamp || !svix_signature || !webhookSecret) {
        console.error('Missing webhook verification headers or secret');
        return new Response(JSON.stringify({ error: 'Missing verification headers' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // Verify the webhook
    const svixHeaders = {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
    };

    let event;
    try {
        const wh = new Webhook(webhookSecret);
        event = wh.verify(JSON.stringify(payload), svixHeaders);
    } catch (error) {
        console.error('Error verifying webhook:', error);
        return new Response(JSON.stringify({ error: 'Error verifying webhook' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const eventType = event.type;
    const { id } = event.data;

    console.log(`Processing Clerk webhook: ${eventType} for user ${id}`);

    // Handle user creation/update events
    if (eventType === 'user.created' || eventType === 'user.updated') {
        const { id, email_addresses, first_name, last_name, image_url, created_at, updated_at } = event.data;

        // Get primary email
        const primaryEmail = email_addresses?.find(email => email.id === event.data.primary_email_address_id);
        const emailAddress = primaryEmail?.email_address;

        // Check if user already exists in our database
        const existingUser = await getUserById(id);

        if (!existingUser && eventType === 'user.created') {
            // Create new user in our database
            try {
                const userData = {
                    id,
                    organizationId: process.env.DEFAULT_ORGANIZATION_ID || 'default',
                    email: emailAddress,
                    displayName: `${first_name || ''} ${last_name || ''}`.trim() || 'User',
                    avatarUrl: image_url,
                    firstName: first_name || '',
                    lastName: last_name || '',
                    role: 'worker', // Default role
                    isActive: true,
                    createdAt: new Date(created_at).toISOString(),
                    updatedAt: new Date(updated_at).toISOString(),
                };

                await createNewUser(userData);
                console.log(`Created user in database: ${id}`);

            } catch (error) {
                console.error('Error creating user in database:', error);
                return new Response(JSON.stringify({ error: 'Error creating user' }), {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
        } else if (existingUser && eventType === 'user.updated') {
            // Update existing user in our database
            try {
                const userData = {
                    email: emailAddress || existingUser.email,
                    displayName: `${first_name || ''} ${last_name || ''}`.trim() || existingUser.displayName,
                    avatarUrl: image_url || existingUser.avatarUrl,
                    firstName: first_name || existingUser.firstName,
                    lastName: last_name || existingUser.lastName,
                    updatedAt: new Date(updated_at).toISOString(),
                };

                await updateExistingUser(id, userData);
                console.log(`Updated user in database: ${id}`);

            } catch (error) {
                console.error('Error updating user in database:', error);
                return new Response(JSON.stringify({ error: 'Error updating user' }), {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
        }
    }

    // Handle user deletion
    if (eventType === 'user.deleted') {
        // You could implement soft-delete logic here
        console.log(`User deleted in Clerk: ${id}`);
    }

    return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}