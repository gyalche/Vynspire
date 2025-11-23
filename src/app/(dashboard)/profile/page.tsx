'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/store/authStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';

export default function ProfilePage() {
    const { user, isAuthenticated, updateUser } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (!isAuthenticated || !user) {
            router.push('/login');
            return;
        }
        setFormData({ name: user.name, email: user.email });
        setAvatarPreview(user.avatarUrl ?? null);
    }, [isAuthenticated, user, router]);

    if (!isAuthenticated || !user) {
        return null;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            updateUser({
                name: formData.name.trim(),
                email: formData.email.trim(),
                avatarUrl: avatarPreview,
            });
            toast.success('Profile updated!');
        } catch (err) {
            toast.error('Failed to update profile');
        } finally {
            setIsSaving(false);
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const result = typeof reader.result === 'string' ? reader.result : null;
            setAvatarPreview(result);
        };
        reader.readAsDataURL(file);
    };

    const handleRemoveAvatar = () => {
        setAvatarPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="max-w-3xl mx-auto pb-12 space-y-8">
            <section className="glass rounded-3xl border border-border/40 p-8 shadow-[0_35px_80px_rgba(15,23,42,0.15)]">
                <p className="text-xs uppercase tracking-[0.65em] text-primary/80 mb-3">Your account</p>
                <h1 className="text-4xl font-bold text-foreground mb-4">Profile settings</h1>
                <p className="text-muted-foreground max-w-2xl">
                    Update your visible profile information. Password changes are managed on our security portal.
                </p>
            </section>
            <Card className="glass border border-border/40 bg-card/85">
                <CardHeader className="border-b border-border/40">
                    <CardTitle className="text-2xl font-semibold text-foreground">
                        Personal details
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <label className="text-sm font-medium text-foreground block">Profile photo</label>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                <div className="relative w-20 h-20 rounded-full bg-foreground/10 flex items-center justify-center text-2xl font-semibold text-foreground overflow-hidden border border-border/60">
                                    {avatarPreview ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
                                    ) : (
                                        formData.name.charAt(0)
                                    )}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-wrap gap-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            Upload new
                                        </Button>
                                        {avatarPreview && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={handleRemoveAvatar}
                                            >
                                                Remove
                                            </Button>
                                        )}
                                    </div>
                                    <p className="text-xs text-muted-foreground">PNG or JPEG up to 2MB.</p>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/png,image/jpeg"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Display name</label>
                            <Input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Jane Doe"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Email address</label>
                            <Input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@vynspire.com"
                                required
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit" isLoading={isSaving} className="min-w-[140px]">
                                Save changes
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
