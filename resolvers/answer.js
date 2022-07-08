export default {
    Query: {
      getAnswer: async (parent, args, context, info) => {
        try {
          let answer = await context.models.Answer.find({ delete: false })
          return answer
        } catch (error) {
          console.error("Error : ", error)
        }
      }
    },
    Answer: {
      customer_id: async (answer) => {
          let resultAnswer = await answer.populate('customer_id').execPopulate();
          return resultAnswer.customer_id
      },
      staff_id: async (answer) => {
        let resultAnswer = await answer.populate('staff_id').execPopulate();
        return resultAnswer.staff_id
    },
    form_id: async (answer) => {
        let resultAnswer = await answer.populate('form_id').execPopulate();
        return resultAnswer.form_id
    },
      workspace_ids: async (answer) => {
          let resultAnswer = await answer.populate('workspace_ids').execPopulate();
          return resultAnswer.workspace_ids
      },
      site_id: async (answer) => {
          let resultAnswer = await answer.populate('site_id').execPopulate();
          return resultAnswer.site_id
      }
      
  }
  }