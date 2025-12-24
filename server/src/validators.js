export const validateStatus = (status) => ['available', 'out_of_stock'].includes(status);

export const validateProductPayload = ({ name_ar, description_ar, status }) => {
  if (!name_ar || !description_ar) return 'الاسم والوصف مطلوبان';
  if (!validateStatus(status)) return 'حالة المنتج يجب أن تكون available أو out_of_stock';
  return null;
};
