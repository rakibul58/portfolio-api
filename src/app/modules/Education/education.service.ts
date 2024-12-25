import QueryBuilder from '../../builder/QueryBuilder';
import { IEducation } from './education.interface';
import { Education } from './education.model';

const createEducationInDB = async (educationData: Partial<IEducation>) => {
  const education = await Education.create(educationData);
  return education;
};

const getAllEducationFromDB = async (query: any) => {
  const educationQuery = new QueryBuilder(Education.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await educationQuery.modelQuery;
  const meta = await educationQuery.countTotal();

  return {
    education: result,
    totalPages: meta.totalPage,
    currentPage: meta.page,
  };
};

const getEducationByIdFromDB = async (id: string) => {
  const education = await Education.findById(id);
  return education;
};

const updateEducationInDB = async (
  id: string,
  educationData: Partial<IEducation>,
) => {
  const education = await Education.findByIdAndUpdate(id, educationData, {
    new: true,
    runValidators: true,
  });
  return education;
};

const deleteEducationFromDB = async (id: string) => {
  const education = await Education.findByIdAndDelete(id);
  return education;
};

export const EducationService = {
  createEducationInDB,
  getAllEducationFromDB,
  getEducationByIdFromDB,
  updateEducationInDB,
  deleteEducationFromDB,
};
