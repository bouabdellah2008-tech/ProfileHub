import { db } from '@/lib/db'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, Briefcase, Globe } from 'lucide-react'

async function getProfiles() {
  const profiles = await db.userProfile.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return profiles
}

export default async function ProfilesPage() {
  const profiles = await getProfiles()

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