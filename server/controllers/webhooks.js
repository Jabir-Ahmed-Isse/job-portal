import { Webhook } from "svix";
import User from "../models/User.js";

// Keeps the User collection in sync with Clerk. Clerk calls this endpoint when a
// user is created, updated or deleted; the signature is checked with CLERK_KEY.

export const clerkwebhooks = async (req, res) => {
  try {
    // Clerk signs webhooks with Svix
    const whook = new Webhook(process.env.CLERK_KEY);

    // Reject requests that were not signed by Clerk
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    // Event payload
    const { data, type } = req.body;

    // Handle each event type
    switch (type) {
      case "user.created": {
        const userData ={
            _id:data.id,
            email:data.email_addresses[0].email_address,
            name:data.first_name + " " + data.last_name,
            image:data.image_url,
            resume:''
        }
        await User.create(userData)
        res.json({})
        break;
      }
      case "user.updated": {
        const userData ={
            email:data.email_addresses[0].email_address,
            name:data.first_name + " " + data.last_name,
            image:data.image_url,
        }
        await User.findByIdAndUpdate(data.id,userData)
        res.json({})
        break;
      }
      case "user.deleted": {
        await User.findByIdAndDelete(data.id)
        res.json({})
        break;
      }
      default:
        res.json({})
        break;
    }
  } catch (error) {
    console.log(error.message);
    res.json({success:false,message:"Webhooks Error"})
  }
};
