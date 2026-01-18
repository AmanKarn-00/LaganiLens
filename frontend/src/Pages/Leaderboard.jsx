import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Trophy, Medal, TrendingUp, TrendingDown, User } from "lucide-react"

const Leaderboard = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/leaderboard")
      const data = await res.json()
      setUsers(data.leaderboard || [])
    } catch (err) {
      console.error("Error fetching leaderboard:", err)
    } finally {
      setLoading(false)
    }
  }

  const getRankIcon = (index) => {
    if (index === 0) return <Trophy className="h-5 w-5 text-yellow-500" />
    if (index === 1) return <Medal className="h-5 w-5 text-gray-400" />
    if (index === 2) return <Medal className="h-5 w-5 text-amber-600" />
    return <span className="h-5 w-5 flex items-center justify-center text-sm font-bold text-muted-foreground">{index + 1}</span>
  }

  const getRankBadge = (index) => {
    if (index === 0) return "default"
    if (index === 1) return "secondary"
    if (index === 2) return "outline"
    return "outline"
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            className="mb-4 -ml-2"
            onClick={() => navigate("/homepage")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
              <p className="text-muted-foreground">
                Top investors ranked by portfolio performance
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              <Badge variant="secondary">Rankings</Badge>
            </div>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Loading State */}
        {loading && (
          <Card>
            <CardContent className="py-12">
              <div className="text-center text-muted-foreground">
                <Trophy className="h-8 w-8 mx-auto mb-4 animate-pulse" />
                <p>Loading leaderboard...</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {!loading && users.length === 0 && (
          <Card>
            <CardContent className="py-12">
              <div className="text-center text-muted-foreground">
                <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No rankings available</p>
                <p className="text-sm mt-1">Be the first to add stocks to your portfolio! </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Leaderboard List */}
        {!loading && users.length > 0 && (
          <div className="space-y-3">
            {users.map((user, index) => (
              <Card 
                key={user.firebaseUid} 
                className={`transition-all hover:shadow-md ${
                  index === 0 ? 'border-yellow-500/50 bg-yellow-500/5' : 
                  index === 1 ? 'border-gray-400/50 bg-gray-400/5' :
                  index === 2 ? 'border-amber-600/50 bg-amber-600/5' :  ''
                }`}
              >
                <CardContent className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                        {getRankIcon(index)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{user.name}</p>
                          {index < 3 && (
                            <Badge variant={getRankBadge(index)} className="text-xs">
                              #{index + 1}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`flex items-center gap-1 font-bold text-lg ${
                        user.netProfit >= 0 ? 'text-emerald-600' : 'text-red-600'
                      }`}>
                        {user.netProfit >= 0 ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        Rs.  {Math.abs(user.netProfit).toLocaleString('en-NP', { maximumFractionDigits: 2 })}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {user.netProfit >= 0 ? 'Profit' : 'Loss'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Leaderboard