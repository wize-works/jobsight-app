import React from 'react';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-background py-6 border-t">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                        © {currentYear} JobSight. All rights reserved.
                    </p>
                    <div className="mt-4 md:mt-0 flex space-x-4">
                        <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}