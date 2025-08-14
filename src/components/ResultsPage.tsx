import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Leaf,
    Download,
    RotateCcw,
    ZoomIn,
    ZoomOut,
    Eye,
    FileText,
    PieChart,
    TrendingUp,
    Calendar,
    MapPin,
    Thermometer
} from "lucide-react";
import { Link } from "react-router-dom";
import sampleImage from "@src/assets/sample-disease.jpg";
import dataBackground from "@src/assets/data-bg.jpg";


// Mock diagnosis data
const diagnosisData = {
    disease_class: "Tomato Early Blight",
    confidence: 0.92,
    affected_area: 0.34,
    severity: "Moderate",
    treatment: [
        "Remove infected leaves immediately",
        "Apply copper-based fungicide spray",
        "Improve air circulation around plants",
        "Reduce watering frequency",
        "Monitor weekly for progression"
    ],
    metadata: {
        analysis_time: "2.1s",
        model_version: "AgriVision-CNN-v2.3",
        date: new Date().toLocaleDateString(),
        resolution: "1920 × 1080 px"
    }
};

const ResultsPage = () => {
    const [zoomLevel, setZoomLevel] = useState(100);
    const [showOverlay, setShowOverlay] = useState(true);

    const getConfidenceColor = (confidence: number) => {
        if (confidence >= 0.9) return 'text-success';
        if (confidence >= 0.7) return 'text-warning';
        return 'text-destructive';
    };

    const getSeverityColor = (severity: string) => {
        switch (severity.toLowerCase()) {
            case 'low': return 'bg-success/10 text-success border-success/20';
            case 'moderate': return 'bg-warning/10 text-warning border-warning/20';
            case 'high': return 'bg-destructive/10 text-destructive border-destructive/20';
            default: return 'bg-muted/10 text-muted-foreground border-muted/20';
        }
    };

    const handleZoomIn = () => {
        setZoomLevel(prev => Math.min(prev + 25, 200));
    };

    const handleZoomOut = () => {
        setZoomLevel(prev => Math.max(prev - 25, 50));
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Navigation */}
            <nav className="border-b border-border bg-background/95 backdrop-blur-sm">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center space-x-2">
                        <Leaf className="w-8 h-8 text-primary" />
                        <span className="text-xl font-heading font-bold text-foreground">AgriVision AI</span>
                    </Link>
                    <div className="flex items-center space-x-6">
                        <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                            Home
                        </Link>
                        <Link to="/upload" className="text-muted-foreground hover:text-foreground transition-colors">
                            Analyze
                        </Link>
                        <span className="text-primary font-medium">Results</span>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                            Diagnostic Results
                        </h1>
                        <p className="text-muted-foreground">
                            Comprehensive analysis completed on {diagnosisData.metadata.date}
                        </p>
                    </div>

                    <div className="flex items-center space-x-3">
                        <Button variant="outline" className="btn-outline-scientific">
                            <FileText className="w-4 h-4 mr-2" />
                            Generate Report
                        </Button>
                        <Button className="btn-scientific">
                            <Download className="w-4 h-4 mr-2" />
                            Export Data
                        </Button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Image Analysis Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="card-scientific">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-heading font-semibold text-foreground">
                                        Visual Analysis
                                    </h2>
                                    <div className="flex items-center space-x-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setShowOverlay(!showOverlay)}
                                            className={showOverlay ? 'bg-primary/10 text-primary' : ''}
                                        >
                                            <Eye className="w-4 h-4 mr-2" />
                                            Overlay
                                        </Button>
                                        <Button variant="ghost" size="sm" onClick={handleZoomOut}>
                                            <ZoomOut className="w-4 h-4" />
                                        </Button>
                                        <span className="text-sm text-muted-foreground">{zoomLevel}%</span>
                                        <Button variant="ghost" size="sm" onClick={handleZoomIn}>
                                            <ZoomIn className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>

                                <Tabs defaultValue="comparison" className="w-full">
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="comparison">Side-by-Side</TabsTrigger>
                                        <TabsTrigger value="overlay">AI Overlay</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="comparison" className="space-y-4">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <h3 className="font-medium text-foreground">Original Image</h3>
                                                <div className="relative rounded-lg overflow-hidden bg-muted">
                                                    <img
                                                        src={sampleImage}
                                                        alt="Original leaf"
                                                        className="w-full h-64 object-cover transition-transform duration-300"
                                                        style={{ transform: `scale(${zoomLevel / 100})` }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <h3 className="font-medium text-foreground">AI Analysis</h3>
                                                <div className="relative rounded-lg overflow-hidden bg-muted">
                                                    <img
                                                        src={sampleImage}
                                                        alt="AI analyzed leaf"
                                                        className="w-full h-64 object-cover transition-transform duration-300"
                                                        style={{ transform: `scale(${zoomLevel / 100})` }}
                                                    />
                                                    {showOverlay && (
                                                        <div className="absolute inset-0 bg-destructive/20 border-2 border-destructive/50 rounded-lg">
                                                            <div className="absolute top-2 left-2 text-xs bg-destructive text-destructive-foreground px-2 py-1 rounded">
                                                                Disease Detected
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="overlay" className="space-y-4">
                                        <div className="relative rounded-lg overflow-hidden bg-muted max-w-md mx-auto">
                                            <img
                                                src={sampleImage}
                                                alt="AI overlay analysis"
                                                className="w-full h-80 object-cover transition-transform duration-300"
                                                style={{ transform: `scale(${zoomLevel / 100})` }}
                                            />
                                            {showOverlay && (
                                                <>
                                                    <div className="absolute inset-0 bg-gradient-to-br from-destructive/30 to-warning/20"></div>
                                                    <div className="absolute top-4 left-4 space-y-2">
                                                        <Badge className="bg-destructive/90 text-destructive-foreground">
                                                            Primary Lesion
                                                        </Badge>
                                                        <Badge className="bg-warning/90 text-warning-foreground">
                                                            Secondary Symptoms
                                                        </Badge>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </div>
                        </Card>

                        {/* Quantitative Analysis */}
                        <Card className="card-scientific">
                            <div className="space-y-6">
                                <h2 className="text-xl font-heading font-semibold text-foreground">
                                    Quantitative Metrics
                                </h2>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium text-foreground">Affected Area</span>
                                                <span className="text-sm text-muted-foreground">
                                                    {(diagnosisData.affected_area * 100).toFixed(1)}%
                                                </span>
                                            </div>
                                            <div className="progress-scientific">
                                                <div
                                                    className="progress-fill bg-gradient-to-r from-destructive to-warning"
                                                    style={{ width: `${diagnosisData.affected_area * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium text-foreground">Disease Confidence</span>
                                                <span className={`text-sm font-medium ${getConfidenceColor(diagnosisData.confidence)}`}>
                                                    {(diagnosisData.confidence * 100).toFixed(1)}%
                                                </span>
                                            </div>
                                            <div className="progress-scientific">
                                                <div
                                                    className="progress-fill"
                                                    style={{ width: `${diagnosisData.confidence * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-center p-6 bg-muted/30 rounded-lg">
                                            <div className="text-center">
                                                <PieChart className="w-12 h-12 text-primary mx-auto mb-2" />
                                                <div className="text-2xl font-heading font-bold text-foreground">
                                                    {(diagnosisData.affected_area * 100).toFixed(0)}%
                                                </div>
                                                <div className="text-sm text-muted-foreground">Leaf Area Affected</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Diagnosis Panel */}
                    <div className="space-y-6">
                        {/* Disease Classification */}
                        <Card className="card-scientific">
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <Leaf className="w-5 h-5 text-primary" />
                                    <h2 className="text-lg font-heading font-semibold text-foreground">
                                        Disease Classification
                                    </h2>
                                </div>

                                <div className="space-y-3">
                                    <div>
                                        <h3 className="text-xl font-heading font-bold text-foreground">
                                            {diagnosisData.disease_class}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            <em>Alternaria solani</em> pathogen detected
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Confidence Level</span>
                                        <Badge className={`${getConfidenceColor(diagnosisData.confidence)} bg-transparent border`}>
                                            {(diagnosisData.confidence * 100).toFixed(1)}%
                                        </Badge>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Severity</span>
                                        <Badge className={getSeverityColor(diagnosisData.severity)}>
                                            {diagnosisData.severity}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Treatment Recommendations */}
                        <Card className="card-scientific">
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <TrendingUp className="w-5 h-5 text-secondary" />
                                    <h2 className="text-lg font-heading font-semibold text-foreground">
                                        Treatment Protocol
                                    </h2>
                                </div>

                                <div className="space-y-3">
                                    {diagnosisData.treatment.map((step, index) => (
                                        <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                                            <div className="w-6 h-6 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                                                {index + 1}
                                            </div>
                                            <p className="text-sm text-foreground leading-relaxed">{step}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card>

                        {/* Analysis Metadata */}
                        <Card className="card-scientific bg-muted/20">
                            <div className="space-y-4">
                                <h2 className="text-lg font-heading font-semibold text-foreground">
                                    Analysis Details
                                </h2>

                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Calendar className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-muted-foreground">Date</span>
                                        </div>
                                        <span className="font-medium text-foreground">{diagnosisData.metadata.date}</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Thermometer className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-muted-foreground">Processing Time</span>
                                        </div>
                                        <span className="font-medium text-foreground">{diagnosisData.metadata.analysis_time}</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <MapPin className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-muted-foreground">Model Version</span>
                                        </div>
                                        <span className="font-medium text-foreground">{diagnosisData.metadata.model_version}</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Eye className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-muted-foreground">Resolution</span>
                                        </div>
                                        <span className="font-medium text-foreground">{diagnosisData.metadata.resolution}</span>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <Button className="btn-scientific w-full">
                                <Download className="w-4 h-4 mr-2" />
                                Generate Full Report (PDF)
                            </Button>

                            <div className="grid grid-cols-2 gap-3">
                                <Link to="/upload">
                                    <Button variant="outline" className="btn-outline-scientific w-full">
                                        <RotateCcw className="w-4 h-4 mr-2" />
                                        New Analysis
                                    </Button>
                                </Link>

                                <Button variant="outline" className="btn-outline-scientific w-full">
                                    <FileText className="w-4 h-4 mr-2" />
                                    Save Dataset
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultsPage;