import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/leaderboard");
      const data = await res.json();
      setUsers(data.leaderboard || []);
    } catch (err) {
      console.error("Error fetching leaderboard:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>

        {loading ? (
          <p>Loading...</p>
        ) : users.length === 0 ? (
          <p>No data available</p>
        ) : (
          <div className="space-y-4">
            {users.map((user, index) => (
              <Card key={user.firebaseUid} className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-lg">{index + 1}. {user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <div>
                  <p className={`font-bold ${user.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    Rs. {user.netProfit.toLocaleString('en-NP', { maximumFractionDigits: 2 })}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
