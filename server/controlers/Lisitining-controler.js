import lisitingmodel from "../Model/Lisitinin-model.js"
export const create=async (req,res)=>{
    console.log(req.body)
    
        try{

            const listing=await lisitingmodel.create(req.body)
            return res.json({creation:true,listing:listing})
                }
                catch(err)
                {
                    return res.json({creation:false})
                }

    

   

}

export const update = async (req, res) => {
    if (req.id === req.body.userref) {
        try {
            const listing = await lisitingmodel.findOneAndUpdate(
                { _id: req.body._id }, // Assuming the document is identified by _id
                req.body,
                { new: true } // This option returns the updated document
            );
            
            return res.json({ update: true, listing: listing });
        } catch (err) {
            return res.json({ update: false });
        }
    }
};



export const getlisiting = async (req, res) => {
    if(req.params.id===req.id)
    {
        try {
            const lisitings = await lisitingmodel.find({ userref: req.params.id });
            return res.json({ data: lisitings });
        } catch (err) {
            console.error("Error fetching listings:", err);
            return res.status(500).json({ error: "Internal server error" });
        }


    }
  
};



export const deletelisting = async (req, res) => {

    
        try {
            const lisitings = await lisitingmodel.findOneAndDelete({ _id: req.params.id });
            return res.json({ delete: true });
        } catch (err) {
            console.error("Error fetching listings:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        


  
};

export const getsinglelisting = async (req, res) => {
    try {
        
        console.log("Request ID:", req.params.id); // Debugging ID
        const listing = await lisitingmodel.findOne({ _id: req.params.id });
        if (listing) {
            console.log("milgia")
            return res.json({ findlisting: true, listing: listing });
        } else {
            console.log("nhi mila")
            return res.json({ findlisting: false, message: "No listing found" });
        }
    } catch (err) {
        console.error("Error fetching listing:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const search = async (req, res) => {
    try {
        

        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;

        let furnish = req.query.furnish;
        if (furnish === undefined || furnish === "false") {
            furnish = { $in: [false, true] };
        } else {
            furnish = furnish === "true";
        }

        let offer = req.query.offer;
        if (offer === undefined || offer === "false") {
            offer = { $in: [false, true] };
        } 

        let type = req.query.type;
        if (type === "all" || type === undefined) {
            type = { $in: ["rent", "sale"] };
        }

        let parking = req.query.parking;

        if (parking === "false" || parking === undefined) {
           
            parking = { $in: [0,1,2,3,4,5,6,7,8,9,10] };
        } else {
            parking = { $in: [1,2,3,4,5,6,7,8,9,10] };
        }

        const sort = req.query.sort || "createdAt";
        const order = req.query.order || "desc";

        const searchTerm = req.query.searchTerm || "";

        


        const listings = await lisitingmodel.find({
            name: { $regex: searchTerm, $options: 'i' },
            offer,
            type,
            furnish,
            parking,
        })
        .limit(limit)
        .skip(startIndex)
        .sort({ [sort]: order });

        console.log("Found listings:", listings);

        return res.json({found:true,listings});
    } catch (err) {
        console.error("Error fetching listings:", err);
        return res.status(500).json({ error: "An error occurred while fetching listings" });
    }
};
