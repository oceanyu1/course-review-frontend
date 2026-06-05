import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const termsSections = [
    {
        title: "Acceptance of Terms",
        description: "By accessing or using RavensRate, you agree to these Terms of Service.",
        points: ["If you do not agree to these terms, do not use the Site."],
    },
    {
        title: "Purpose of the Site",
        description: "RavensRate is an independent platform that allows users to share and read reviews of courses offered at Carleton University.",
        points: ["The Site is not affiliated with, endorsed by, or operated by Carleton University."],
    },
    {
        title: "User Accounts",
        description: "To post reviews, users must create an account.",
        points: [
            "Providing accurate account information",
            "Maintaining the security of your account",
            "All activity occurring under your account",
        ],
    },
    {
        title: "User Content",
        description: "You retain ownership of content you submit.",
        points: ["By submitting content, you grant the Site a non-exclusive license to display, store, and distribute that content as necessary to operate the platform."],
    },
    {
        title: "Prohibited Content",
        description: "Users may not post content that includes harmful, abusive, or misleading material.",
        points: [
            "Is false, misleading, or intentionally deceptive",
            "Contains personal information about students, instructors, or other individuals",
            "Harasses, threatens, or targets individuals",
            "Is defamatory, unlawful, or abusive",
            "Contains spam or promotional material",
            "Violates intellectual property rights",
        ],
    },
    {
        title: "Moderation",
        description: "We reserve the right to remove reviews, comments, accounts, or other content at our sole discretion, including content that violates these Terms.",
        points: ["We are not obligated to remove any content but may do so when necessary to maintain the quality and safety of the Site."],
    },
    {
        title: "Reviews and Opinions",
        description: "Reviews represent the opinions of individual users.",
        points: ["We do not guarantee the accuracy, completeness, or reliability of user-submitted content."],
    },
    {
        title: "Availability",
        description: "We may modify, suspend, or discontinue the Site at any time without notice.",
        points: ["We do not guarantee uninterrupted availability of the Site."],
    },
    {
        title: "Limitation of Liability",
        description: "The Site is provided as is without warranties of any kind.",
        points: ["To the fullest extent permitted by law, we are not liable for any damages arising from the use of the Site or reliance on content posted by users."],
    },
    {
        title: "Termination",
        description: "We may suspend or terminate accounts that violate these Terms or engage in conduct that harms the Site or its users.",
    },
    {
        title: "Changes to These Terms",
        description: "We may update these Terms from time to time. Continued use of the Site after changes are posted constitutes acceptance of the updated Terms.",
    },
];

function TermsOfService() {
    return (
        <div className="container mx-auto px-6 py-12 max-w-5xl">
            <div className="mb-8 flex flex-col gap-4 rounded-3xl border bg-gradient-to-br from-background via-background to-muted/40 p-8 shadow-sm md:p-10">
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span className="rounded-full border bg-background px-3 py-1">RavensRate</span>
                    <span>Terms of Service</span>
                    <span>Last updated: June 5, 2026</span>
                </div>
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Terms of Service</h1>
                    <p className="max-w-3xl text-lg text-muted-foreground">
                        These Terms explain how RavensRate can be used, what content is allowed, and the expectations that apply when you post or read course reviews.
                    </p>
                    <p className="max-w-3xl text-sm text-muted-foreground">
                        By accessing or using the Site, you agree to these Terms of Service.
                    </p>
                </div>
            </div>

            <div className="space-y-5">
                <Card>
                    <CardHeader>
                        <CardTitle>Introduction</CardTitle>
                        <CardDescription>
                            RavensRate is an independent student review platform, and these terms are intended to keep the site usable, safe, and fair.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
                        <p>
                            If you do not agree to these terms, do not use the Site.
                        </p>
                        <p>
                            The sections below summarize the main responsibilities that come with using the platform.
                        </p>
                    </CardContent>
                </Card>

                {termsSections.map((section) => (
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
                            {section.points && (
                                <ul className="list-disc space-y-1 pl-5">
                                    {section.points.map((point) => (
                                        <li key={point}>{point}</li>
                                    ))}
                                </ul>
                            )}
                        </CardContent>
                    </Card>
                ))}

                <Card>
                    <CardHeader>
                        <CardTitle>Contact</CardTitle>
                        <CardDescription>
                            Questions regarding these Terms may be directed to us by email.
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

export default TermsOfService;