http://52.172.97.26:4000/graphql


query {
    getStaffs {
      _id
      name
    }
  }

  query{
    getSite{
      _id
      name
    }
  }

  query {
    getWorkspace {
      _id
      name
      site_id {
        _id
        name
      }
    }
  }
  
  query {
    getCustomer {
      _id
      name
    }
  }
  
  