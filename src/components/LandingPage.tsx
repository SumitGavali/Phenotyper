import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Leaf, Microscope, Zap, Shield, Database, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-science.jpg";

const LandingPage = () => {
    const features = [
        {
            icon: <Microscope className="icon-scientific" />,
            title: "Real-time CNN Diagnostics",
            description: "Advanced convolutional neural networks for instant disease identification"
        },
        {
            icon: <Zap className="icon-scientific" />,
            title: "95%+ Accuracy Rate",
            description: "Research-validated models trained on 10,000+ plant pathology samples"
        },
        {
            icon: <Shield className="icon-scientific" />,
            title: "Early Detection",
            description: "Identify diseases before visible symptoms appear with spectral analysis"
        },
        {
            icon: <Database className="icon-scientific" />,
            title: "Comprehensive Database",
            description: "500+ disease classifications across major crop species"
        },
        {
            icon: <TrendingUp className="icon-scientific" />,
            title: "Research Integration",
            description: "Export-ready data for scientific publications and field studies"
        },
        {
            icon: <Leaf className="icon-scientific" />,
            title: "Multi-Crop Support",
            description: "Tomato, corn, wheat, soybean, and 20+ other crop varieties"
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Navigation */}
            <nav className="border-b border-border bg-background/95 backdrop-blur-sm fixed w-full top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Leaf className="w-8 h-8 text-primary" />
                        <span className="text-xl font-heading font-bold text-foreground">AgriVision AI</span>
                    </div>
                    <div className="flex items-center space-x-6">
                        <Link to="/upload" className="text-muted-foreground hover:text-foreground transition-colors">
                            Analyze
                        </Link>
                        <Link to="/results" className="text-muted-foreground hover:text-foreground transition-colors">
                            Results
                        </Link>
                        <Button variant="outline" className="btn-outline-scientific">
                            Research Portal
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-24 pb-12 lg:pt-32 lg:pb-20">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h1 className="text-4xl lg:text-6xl font-heading font-bold text-foreground leading-tight">
                                    Precision Plant
                                    <span className="bg-gradient-primary bg-clip-text text-transparent"> Pathology</span>
                                </h1>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    Advanced AI-powered crop disease detection for agricultural researchers.
                                    Upload plant images and receive instant, scientifically-validated diagnostic reports.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to="/upload">
                                    <Button className="btn-scientific w-full sm:w-auto text-lg px-8 py-4">
                                        <Leaf className="w-5 h-5 mr-2" />
                                        Analyze Image
                                    </Button>
                                </Link>
                                <Button variant="outline" className="btn-outline-scientific w-full sm:w-auto text-lg px-8 py-4">
                                    <Microscope className="w-5 h-5 mr-2" />
                                    View Research
                                </Button>
                            </div>

                            <div className="flex items-center space-x-8 text-sm text-muted-foreground">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-success rounded-full animate-pulse-success"></div>
                                    <span>Real-time Analysis</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse-success"></div>
                                    <span>Research Grade</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-secondary rounded-full animate-pulse-success"></div>
                                    <span>Export Ready</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="relative rounded-2xl overflow-hidden shadow-scientific">
                                <img
                                    src={heroImage}
                                    alt="Scientific crop analysis"
                                    className="w-full h-auto object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
                            </div>

                            {/* Floating Stats */}
                            <div className="absolute -bottom-6 -left-6 card-scientific bg-card/95 backdrop-blur-sm animate-float">
                                <div className="text-2xl font-heading font-bold text-primary">95.3%</div>
                                <div className="text-sm text-muted-foreground">Detection Accuracy</div>
                            </div>

                            <div className="absolute -top-6 -right-6 card-scientific bg-card/95 backdrop-blur-sm animate-float" style={{ animationDelay: '1s' }}>
                                <div className="text-2xl font-heading font-bold text-secondary">2.1s</div>
                                <div className="text-sm text-muted-foreground">Analysis Time</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
                            Research-Grade Plant Pathology
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Built for agricultural scientists, field researchers, and crop protection specialists
                            who demand precision and scientific rigor in their diagnostic tools.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <Card key={index} className="card-scientific border-card-border hover:scale-[1.02] transition-transform duration-300">
                                <div className="space-y-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-heading font-semibold text-foreground">
                                        {feature.title}
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-3xl mx-auto space-y-8">
                        <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground">
                            Ready to Advance Your Research?
                        </h2>
                        <p className="text-xl text-muted-foreground">
                            Join thousands of agricultural researchers using AgriVision AI
                            for precision plant pathology analysis.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/upload">
                                <Button className="btn-scientific text-lg px-8 py-4">
                                    Start Analysis
                                </Button>
                            </Link>
                            <Button variant="outline" className="btn-outline-scientific text-lg px-8 py-4">
                                Download API Docs
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-border py-12 bg-muted/20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <Leaf className="w-6 h-6 text-primary" />
                                <span className="font-heading font-bold">AgriVision AI</span>
                            </div>
                            <p className="text-muted-foreground text-sm">
                                Precision plant pathology powered by advanced machine learning.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-heading font-semibold">Research</h4>
                            <div className="space-y-2 text-sm text-muted-foreground">
                                <div>Publications</div>
                                <div>Datasets</div>
                                <div>API Documentation</div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-heading font-semibold">Tools</h4>
                            <div className="space-y-2 text-sm text-muted-foreground">
                                <div>Disease Detection</div>
                                <div>Batch Analysis</div>
                                <div>Export Reports</div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-heading font-semibold">Support</h4>
                            <div className="space-y-2 text-sm text-muted-foreground">
                                <div>Research Portal</div>
                                <div>Integration Guide</div>
                                <div>Contact Team</div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
                        <p>&copy; 2024 AgriVision AI. Built for agricultural research excellence.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;