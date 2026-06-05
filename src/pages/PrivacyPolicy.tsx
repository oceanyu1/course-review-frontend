import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const policySections = [
    {
        title: "Information We Collect",
        description: "We collect account details, content you submit, and limited technical information needed to run and secure the site.",
        items: [
            {
                label: "Account Information",
                points: ["Name", "Email address", "Program of study", "Year of study", "Password (stored in encrypted/hashed form)"],
            },
            {
                label: "User Content",
                points: ["Course reviews", "Ratings", "Comments", "Other content posted on the Site"],
            },
            {
                label: "Technical Information",
                points: ["IP address", "Browser type", "Device information", "Usage and analytics data", "Log data related to site performance and security"],
            },
        ],
    },
    {
        title: "How We Use Information",
        description: "Collected information is used to operate RavensRate, support reviews, and keep the platform reliable.",
        points: [
            "Create and manage user accounts",
            "Display course reviews and ratings",
            "Improve the Site and user experience",
            "Monitor site usage and performance",
            "Prevent spam, abuse, and unauthorized activity",
            "Respond to user inquiries",
        ],
    },
    {
        title: "Analytics",
        description: "We use analytics services provided through our hosting platform and other tools to understand how the Site is used and to improve performance.",
        points: [
            "Analytics data may be collected in aggregate form.",
            "This may include technical information such as page visits, browser type, and usage patterns.",
        ],
    },
    {
        title: "Sharing of Information",
        description: "We do not sell personal information.",
        points: [
            "With service providers necessary to operate the Site",
            "When required by law",
            "To protect the security and integrity of the Site",
        ],
    },
    {
        title: "Data Security",
        description: "We take reasonable measures to protect user information, but no method of storage or transmission is completely secure.",
    },
    {
        title: "Account Deletion",
        description: "Users may request deletion of their account and associated personal information by contacting us.",
        points: ["Some content may be retained where necessary for legal, security, or operational purposes."],
    },
    {
        title: "Children's Privacy",
        description: "The Site is intended for university students and is not directed toward children under the age of 13.",
    },
    {
        title: "Changes to This Policy",
        description: "We may update this Privacy Policy from time to time. Continued use of the Site after changes are posted constitutes acceptance of the updated policy.",
    },
];

function PrivacyPolicy() {
    return (
        <div className="container mx-auto px-6 py-12 max-w-5xl">
            <div className="mb-8 flex flex-col gap-4 rounded-3xl border bg-gradient-to-br from-background via-background to-muted/40 p-8 shadow-sm md:p-10">
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span className="rounded-full border bg-background px-3 py-1">RavensRate</span>
                    <span>Privacy Policy</span>
                    <span>Last updated: June 5, 2026</span>
                </div>
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Privacy Policy</h1>
                    <p className="max-w-3xl text-lg text-muted-foreground">
                        This Privacy Policy explains how RavensRate collects, uses, and protects information when you use our course review platform for Carleton University students.
                    </p>
                    <p className="max-w-3xl text-sm text-muted-foreground">
                        By creating an account or using the Site, you agree to this Privacy Policy.
                    </p>
                </div>
            </div>

            <div className="space-y-5">
                <Card>
                    <CardHeader>
                        <CardTitle>Introduction</CardTitle>
                        <CardDescription>
                            The policy below reflects the same terms described in the markdown version, presented as a readable site page.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
                        <p>
                            RavensRate is built for Carleton University students to share and explore course feedback.
                        </p>
                        <p>
                            This page covers what we collect, how we use it, and how you can contact us about account deletion or privacy questions.
                        </p>
                    </CardContent>
                </Card>

                {policySections.map((section) => (
                    <Card key={section.title}>
                        <CardHeader>
                            <CardTitle>{section.title}</CardTitle>
                            {section.description && (
                                <CardDescription className="text-sm leading-6">
                                    {section.description}
                                </CardDescription>
                            )}
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
                            {"items" in section && section.items ? (
                                section.items.map((item) => (
                                    <div key={item.label} className="rounded-2xl border bg-muted/30 p-4">
                                        <h3 className="font-semibold text-foreground">{item.label}</h3>
                                        <ul className="mt-3 list-disc space-y-1 pl-5">
                                            {item.points.map((point) => (
                                                <li key={point}>{point}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))
                            ) : (
                                <>
                                    {section.points && (
                                        <ul className="list-disc space-y-1 pl-5">
                                            {section.points.map((point) => (
                                                <li key={point}>{point}</li>
                                            ))}
                                        </ul>
                                    )}
                                </>
                            )}
                        </CardContent>
                    </Card>
                ))}

                <Card>
                    <CardHeader>
                        <CardTitle>Contact</CardTitle>
                        <CardDescription>
                            If you have questions regarding this Privacy Policy, contact us directly.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
                        <p>
                            Email: <a href="mailto:powergameruuu@gmail.com" className="text-primary underline underline-offset-4">powergameruuu@gmail.com</a>
                        </p>
                        <div>
                            <Link to="/" className="text-primary underline underline-offset-4">
                                Return to the homepage
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default PrivacyPolicy;