import { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileImage, CheckCircle, XCircle, Leaf, Camera, Info } from "lucide-react";
import { Link } from "react-router-dom";

interface FileValidation {
    isValid: boolean;
    error?: string;
    size?: string;
    resolution?: string;
}

const ImageUpload = () => {
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileValidation, setFileValidation] = useState<FileValidation>({ isValid: false });
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const { toast } = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const validateFile = useCallback((file: File): FileValidation => {
        // Check file type
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        if (!allowedTypes.includes(file.type)) {
            return {
                isValid: false,
                error: 'Only PNG and JPG files are supported'
            };
        }

        // Check file size (5MB limit)
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (file.size > maxSize) {
            return {
                isValid: false,
                error: 'File size must be less than 5MB'
            };
        }

        // Return valid with metadata
        return {
            isValid: true,
            size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
            resolution: 'Analyzing...' // Would be determined after image load
        };
    }, []);

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const files = e.dataTransfer.files;
        if (files && files[0]) {
            const file = files[0];
            const validation = validateFile(file);

            if (validation.isValid) {
                setSelectedFile(file);
                setFileValidation(validation);

                // Get image dimensions
                const img = new Image();
                img.onload = () => {
                    setFileValidation(prev => ({
                        ...prev,
                        resolution: `${img.width} × ${img.height} px`
                    }));
                };
                img.src = URL.createObjectURL(file);

                toast({
                    title: "File uploaded successfully",
                    description: "Image is ready for analysis",
                });
            } else {
                setFileValidation(validation);
                toast({
                    title: "Upload failed",
                    description: validation.error,
                    variant: "destructive",
                });
            }
        }
    }, [validateFile, toast]);

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    }, []);

    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0]) {
            const file = files[0];
            const validation = validateFile(file);

            if (validation.isValid) {
                setSelectedFile(file);
                setFileValidation(validation);

                // Get image dimensions
                const img = new Image();
                img.onload = () => {
                    setFileValidation(prev => ({
                        ...prev,
                        resolution: `${img.width} × ${img.height} px`
                    }));
                };
                img.src = URL.createObjectURL(file);

                toast({
                    title: "File uploaded successfully",
                    description: "Image is ready for analysis",
                });
            } else {
                setFileValidation(validation);
                toast({
                    title: "Upload failed",
                    description: validation.error,
                    variant: "destructive",
                });
            }
        }
    }, [validateFile, toast]);

    const handleProcessImage = async () => {
        if (!selectedFile || !fileValidation.isValid) return;

        setIsProcessing(true);
        setUploadProgress(0);

        // Simulate upload progress
        for (let i = 0; i <= 100; i += 10) {
            setUploadProgress(i);
            await new Promise(resolve => setTimeout(resolve, 200));
        }

        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 1000));

        toast({
            title: "Analysis complete",
            description: "Image has been processed successfully",
        });

        setIsProcessing(false);
        // Navigate to results page would happen here
    };

    const resetUpload = () => {
        setSelectedFile(null);
        setFileValidation({ isValid: false });
        setUploadProgress(0);
        setIsProcessing(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
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
                        <span className="text-primary font-medium">Analyze</span>
                        <Link to="/results" className="text-muted-foreground hover:text-foreground transition-colors">
                            Results
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
                            Disease Detection Analysis
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Upload high-quality images of crop leaves for AI-powered pathology analysis
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Upload Section */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Drop Zone */}
                            <Card className="card-scientific">
                                <div
                                    className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${dragActive
                                            ? 'border-primary bg-primary/5 scale-[1.02]'
                                            : selectedFile && fileValidation.isValid
                                                ? 'border-success bg-success/5'
                                                : fileValidation.error
                                                    ? 'border-destructive bg-destructive/5'
                                                    : 'border-border hover:border-primary/50 hover:bg-primary/5'
                                        }`}
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                >
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        className="hidden"
                                        accept="image/png,image/jpeg,image/jpg"
                                        onChange={handleFileSelect}
                                    />

                                    <div className="space-y-6">
                                        <div className="flex justify-center">
                                            {selectedFile && fileValidation.isValid ? (
                                                <CheckCircle className="w-16 h-16 text-success animate-pulse-success" />
                                            ) : fileValidation.error ? (
                                                <XCircle className="w-16 h-16 text-destructive" />
                                            ) : (
                                                <Upload className="w-16 h-16 text-muted-foreground" />
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <h3 className="text-xl font-heading font-semibold text-foreground">
                                                {selectedFile && fileValidation.isValid
                                                    ? 'Image Ready for Analysis'
                                                    : fileValidation.error
                                                        ? 'Upload Error'
                                                        : 'Drop your image here'
                                                }
                                            </h3>
                                            <p className="text-muted-foreground">
                                                {fileValidation.error || 'PNG or JPG files up to 5MB'}
                                            </p>
                                        </div>

                                        <Button
                                            onClick={() => fileInputRef.current?.click()}
                                            variant="outline"
                                            className="btn-outline-scientific"
                                        >
                                            <FileImage className="w-4 h-4 mr-2" />
                                            Browse Files
                                        </Button>
                                    </div>
                                </div>
                            </Card>

                            {/* File Preview */}
                            {selectedFile && fileValidation.isValid && (
                                <Card className="card-scientific">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-heading font-semibold text-foreground">Image Preview</h3>
                                            <Button variant="ghost" size="sm" onClick={resetUpload}>
                                                <XCircle className="w-4 h-4 mr-2" />
                                                Remove
                                            </Button>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="relative rounded-lg overflow-hidden bg-muted">
                                                <img
                                                    src={URL.createObjectURL(selectedFile)}
                                                    alt="Preview"
                                                    className="w-full h-48 object-cover"
                                                />
                                            </div>

                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <div className="flex items-center text-sm">
                                                        <span className="text-muted-foreground w-20">File:</span>
                                                        <span className="font-medium text-foreground">{selectedFile.name}</span>
                                                    </div>
                                                    <div className="flex items-center text-sm">
                                                        <span className="text-muted-foreground w-20">Size:</span>
                                                        <span className="font-medium text-foreground">{fileValidation.size}</span>
                                                    </div>
                                                    <div className="flex items-center text-sm">
                                                        <span className="text-muted-foreground w-20">Resolution:</span>
                                                        <span className="font-medium text-foreground">{fileValidation.resolution}</span>
                                                    </div>
                                                </div>

                                                {isProcessing && (
                                                    <div className="space-y-2">
                                                        <div className="flex items-center justify-between text-sm">
                                                            <span>Processing...</span>
                                                            <span>{uploadProgress}%</span>
                                                        </div>
                                                        <Progress value={uploadProgress} className="progress-scientific" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-4">
                                <Button
                                    className="btn-scientific flex-1"
                                    disabled={!selectedFile || !fileValidation.isValid || isProcessing}
                                    onClick={handleProcessImage}
                                >
                                    <Camera className="w-4 h-4 mr-2" />
                                    {isProcessing ? 'Processing...' : 'Process Image'}
                                </Button>

                                <Link to="/results" className="flex-1">
                                    <Button
                                        variant="outline"
                                        className="btn-outline-scientific w-full"
                                        disabled={isProcessing}
                                    >
                                        View Results
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Info Panel */}
                        <div className="space-y-6">
                            <Card className="card-scientific">
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <Info className="w-5 h-5 text-primary" />
                                        <h3 className="font-heading font-semibold text-foreground">Analysis Requirements</h3>
                                    </div>

                                    <div className="space-y-3 text-sm">
                                        <div className="flex items-start space-x-2">
                                            <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                                            <div>
                                                <div className="font-medium text-foreground">Image Quality</div>
                                                <div className="text-muted-foreground">High resolution, well-lit, focused leaf images</div>
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-2">
                                            <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                                            <div>
                                                <div className="font-medium text-foreground">File Format</div>
                                                <div className="text-muted-foreground">PNG or JPG files up to 5MB</div>
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-2">
                                            <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                                            <div>
                                                <div className="font-medium text-foreground">Subject Focus</div>
                                                <div className="text-muted-foreground">Single leaf, minimal background clutter</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <Card className="card-scientific bg-primary/5 border-primary/20">
                                <div className="space-y-4">
                                    <h3 className="font-heading font-semibold text-primary">Supported Crops</h3>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        {['Tomato', 'Corn', 'Wheat', 'Soybean', 'Potato', 'Rice', 'Cotton', 'Pepper'].map((crop) => (
                                            <div key={crop} className="flex items-center space-x-2">
                                                <Leaf className="w-3 h-3 text-secondary" />
                                                <span className="text-foreground">{crop}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageUpload;