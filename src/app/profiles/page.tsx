'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MapPin, Briefcase, Globe } from 'lucide-react'

interface Profile {
  id: string
  firstName: string
  lastName: string
  email: string
  bio: string | null
  profilePicture: string | null
  occupation: string | null
  company: string | null
  city: string | null
  country: string | null
  state: string | null
  website: string | null
  createdAt: string
}

export default function ProfilesPage() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/profile')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProfiles(data.data)
        } else {
          setError(data.message || 'Failed to load profiles')
        }
      })
      .catch((err) => setError('Failed to load profiles'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="container py-10">
        <p className="text-center text-muted-foreground">Loading profiles...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-10">
        <p className="text-center text-destructive">{error}</p>
        <p className="text-center text-sm text-muted-foreground mt-2">
          Make sure DATABASE_URL is configured in your .env file and the database is running.
        </p>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Profiles</h1>
      
      {profiles.length === 0 ? (
        <p className="text-center text-muted-foreground">No profiles found</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {profiles.map((profile) => (
            <Card key={profile.id}>
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={profile.profilePicture || undefined} />
                  <AvatarFallback>
                    {profile.firstName[0]}{profile.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">
                    {profile.firstName} {profile.lastName}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{profile.email}</p>
                </div>
              </CardHeader>
              <CardContent>
                {profile.bio && (
                  <p className="text-sm mb-4">{profile.bio}</p>
                )}
                <div className="space-y-2 text-sm">
                  {profile.occupation && (
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <span>{profile.occupation} at {profile.company}</span>
                    </div>
                  )}
                  {(profile.city || profile.country) && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {[profile.city, profile.state, profile.country].filter(Boolean).join(', ')}
                      </span>
                    </div>
                  )}
                  {profile.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        Website
                      </a>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}