import HttpError from '@wasp/core/HttpError.js'

export const getAutogpt = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const autogpt = await context.entities.Autogpt.findUnique({
    where: { id: args.id, userId: context.user.id },
  });

  if (!autogpt) { throw new HttpError(404, 'No autogpt with id ' + args.id) }

  return autogpt;
}

export const getUserAutogpts = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Autogpt.findMany({
    where: {
      user: { id: context.user.id }
    }
  });
}