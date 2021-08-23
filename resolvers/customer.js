export default {
  Query: {
    getCustomer: async (parent, args, { models }, info) => {
      try {
        let Customer = await models.Customer.find({ delete: false })
        return Customer
      } catch (error) {
        console.error("Error : ", error)
      }
    }
  },
  Mutation: {
    addCustomer: async (parent, args, { models }, info) => {
      try {
        let newCustomer = new models.Customer();
        let clientKeys = Object.keys(args.input);
        if (!clientKeys)
          console.log("Error Customer keys")
        let i = 0;
        while (i < clientKeys.length && clientKeys[i] != 'phone') {
          if (clientKeys[i] in newCustomer) {
            newCustomer[clientKeys[i]] = args.input[clientKeys[i]]
          }
          i++
        }
        newCustomer = await newCustomer.save();
        console.log("newCustomer Created : ", newCustomer)

        return newCustomer
      } catch (error) {
        console.error("Error : ", error)
      }

    }
  },  
  Customer: {
    address_id: async (customer) => {
        let resultAddress = await customer.populate('address_id').execPopulate();
        return resultAddress.address_id
    }
}
}