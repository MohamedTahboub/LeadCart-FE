import * as yup from 'yup';
import castYupErrors from './castErrors';


export default async (settings) => {
  const settingCardSchema = yup.object({
    label: yup.string(),
    value: yup.string(),
    show: yup.boolean(),
    disabled: yup.boolean()
  });

  const settingsSchema = yup.object({
    dashboardSettings: yup.object({
      defaultCardsSettings: yup.object({
        sales: yup.array().of(settingCardSchema),
        refunds: yup.array().of(settingCardSchema)
      }).required(),
      displayMainChart: yup.bool().default(true)
    })
  });

  try {
    const castedDetails = await settingsSchema.validateSync(settings, { abortEarly: false, stripUnknown: true });
    return { isValid: true, value: castedDetails };
  } catch (err) {
    return { isValid: false, errors: castYupErrors(err) };
  }
};

