'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Camera, Loader2, User, Mail, Phone, Calendar, MapPin, Briefcase, Globe, Linkedin, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { profileFormSchema, ProfileFormValues } from '@/lib/validations'
import { toast, Toaster } from '@/hooks/use-toast'

export default function ProfilePage() {
  const [preview, setPreview] = useState<string>('')
  const [isUploading, setIsUploading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: undefined,
      bio: '',
      address: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
      occupation: '',
      company: '',
      website: '',
      linkedin: '',
      twitter: '',
    },
  })

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5000000) {
      toast({
        title: 'File too large',
        description: 'Please select an image under 5MB',
        variant: 'destructive',
      })
      return
    }

    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid file type',
        description: 'Please select an image file',
        variant: 'destructive',
      })
      return
    }

    setIsUploading(true)
    const previewUrl = URL.createObjectURL(file)
    setPreview(previewUrl)

    try {
      const timestamp = Math.round(Date.now() / 1000)
      const signatureResponse = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ timestamp }),
      })

      const { signature, api_key, cloud_name } = await signatureResponse.json()

      const formData = new FormData()
      formData.append('file', file)
      formData.append('api_key', api_key)
      formData.append('timestamp', String(timestamp))
      formData.append('signature', signature)
      formData.append('folder', 'profilehub')

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`,
        {
          method: 'POST',
          body: formData,
        }
      )

      const uploadData = await uploadResponse.json()
      setValue('profilePicture', uploadData.secure_url)
      
      toast({
        title: 'Image uploaded',
        description: 'Your profile picture has been uploaded successfully',
      })
    } catch (error) {
      toast({
        title: 'Upload failed',
        description: 'Failed to upload image. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsUploading(false)
    }
  }

  const onSubmit = async (data: ProfileFormValues) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast({
          title: 'Profile created',
          description: 'Your profile has been created successfully',
        })
// Reset form
         setPreview('')
         Object.keys(data).forEach((key) => {
           setValue(key as keyof ProfileFormValues, key === 'dateOfBirth' ? undefined : '')
         })
      } else {
        throw new Error('Failed to create profile')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create profile. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container flex py-10 items-center justify-center">
      <Toaster />
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Create Your Profile</CardTitle>
          <CardDescription>
            Enter your personal information and upload a profile picture
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src={preview || watch('profilePicture')} />
                <AvatarFallback className="text-3xl">
                  <User className="h-16 w-16" />
                </AvatarFallback>
              </Avatar>
              <div>
                <Label htmlFor="picture" className="cursor-pointer">
                  <Button variant="outline" size="sm" asChild disabled={isUploading}>
                    <span>
                      {isUploading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Camera className="mr-2 h-4 w-4" />
                      )}
                      {isUploading ? 'Uploading...' : 'Upload Photo'}
                    </span>
                  </Button>
                </Label>
                <Input
                  id="picture"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={isUploading}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  {...register('firstName')}
                  aria-invalid={errors.firstName ? 'true' : 'false'}
                />
                {errors.firstName && (
                  <p className="text-sm text-destructive">{errors.firstName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  {...register('lastName')}
                  aria-invalid={errors.lastName ? 'true' : 'false'}
                />
                {errors.lastName && (
                  <p className="text-sm text-destructive">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className="pl-10"
                  {...register('email')}
                  aria-invalid={errors.email ? 'true' : 'false'}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  placeholder="+1 (555) 000-0000"
                  className="pl-10"
                  {...register('phone')}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="dateOfBirth"
                  type="date"
                  className="pl-10"
                  {...register('dateOfBirth')}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself..."
                rows={4}
                {...register('bio')}
              />
              {errors.bio && (
                <p className="text-sm text-destructive">{errors.bio.message}</p>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Address</h3>
              <div className="space-y-2">
                <Label htmlFor="address">Street Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="address"
                    placeholder="123 Main St"
                    className="pl-10"
                    {...register('address')}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="New York" {...register('city')} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" placeholder="NY" {...register('state')} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input id="zipCode" placeholder="10001" {...register('zipCode')} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  placeholder="United States"
                  {...register('country')}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Professional Info</h3>
              <div className="space-y-2">
                <Label htmlFor="occupation">Occupation</Label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="occupation"
                    placeholder="Software Engineer"
                    className="pl-10"
                    {...register('occupation')}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  placeholder="Acme Inc."
                  {...register('company')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="website"
                    placeholder="https://example.com"
                    className="pl-10"
                    {...register('website')}
                  />
                </div>
                {errors.website && (
                  <p className="text-sm text-destructive">{errors.website.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <div className="relative">
                  <Linkedin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="linkedin"
                    placeholder="https://linkedin.com/in/username"
                    className="pl-10"
                    {...register('linkedin')}
                  />
                </div>
                {errors.linkedin && (
                  <p className="text-sm text-destructive">{errors.linkedin.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter</Label>
                <div className="relative">
                  <Twitter className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="twitter"
                    placeholder="@username"
                    className="pl-10"
                    {...register('twitter')}
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting || isUploading}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Profile'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}