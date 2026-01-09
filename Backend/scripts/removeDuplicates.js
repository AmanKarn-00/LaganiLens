import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../Models/db.js";
import NepseStock from "../Models/NEPSEdata.js";

dotenv.config();

const removeDuplicates = async () => {
    try {
        await connectDB();
        console.log("Connected to MongoDB for cleanup...");

        const duplicates = await NepseStock.aggregate([
            {
                $group: {
                    _id: { symbol: "$symbol", date: "$date" },
                    uniqueIds: { $addToSet: "$_id" },
                    count: { $sum: 1 },
                },
            },
            {
                $match: {
                    count: { $gt: 1 },
                },
            },
        ]);

        console.log(`Found ${duplicates.length} groups with duplicates.`);

        let deletedCount = 0;

        for (const group of duplicates) {
            // Keep the first ID, delete the rest
            const idsToDelete = group.uniqueIds.slice(1);

            await NepseStock.deleteMany({ _id: { $in: idsToDelete } });
            deletedCount += idsToDelete.length;
        }

        console.log(`Cleanup complete. Removed ${deletedCount} duplicate documents.`);
        process.exit(0);
    } catch (error) {
        console.error("Error removing duplicates:", error);
        process.exit(1);
    }
};

removeDuplicates();
