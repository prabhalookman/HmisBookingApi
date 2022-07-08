export default {
    Query: {
        getGuest: async (parent, args, context, info) => {
            try {
                let guest = await context.models.Guest.find({})
                return guest
            } catch (error) {
                console.error("Error : ", error)
            }
        }
    },
    Guest: {
        booking_ids: async (guest) => {
            let resultAddOn = await guest.populate('booking_ids').execPopulate();
            return resultAddOn.booking_ids
        },
        invited_customer_id: async (customer) => {
            let resultAddOn = await customer.populate('invited_customer_id').execPopulate();
            return resultAddOn.invited_customer_id
        },
        workspace_ids: async (guest) => {
            let resultAddOn = await guest.populate('workspace_ids').execPopulate();
            return resultAddOn.workspace_ids
        },
        site_id: async (guest) => {
            let resultAddOn = await guest.populate('site_id').execPopulate();
            return resultAddOn.site_id
        }
        
    }
}