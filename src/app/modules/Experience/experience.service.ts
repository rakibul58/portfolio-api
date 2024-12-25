import QueryBuilder from '../../builder/QueryBuilder';
import { IExperience } from './experience.interface';
import { Experience } from './experience.model';

const createExperienceInDB = async (experienceData: Partial<IExperience>) => {
  const experience = await Experience.create(experienceData);
  return experience;
};

const getAllExperienceFromDB = async (query: any) => {
  const experienceQuery = new QueryBuilder(Experience.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await experienceQuery.modelQuery;
  const meta = await experienceQuery.countTotal();

  return {
    experience: result,
    totalPages: meta.totalPage,
    currentPage: meta.page,
  };
};

const getExperienceByIdFromDB = async (id: string) => {
  const experience = await Experience.findById(id);
  return experience;
};

const updateExperienceInDB = async (
  id: string,
  experienceData: Partial<IExperience>,
) => {
  const experience = await Experience.findByIdAndUpdate(id, experienceData, {
    new: true,
    runValidators: true,
  });
  return experience;
};

const deleteExperienceFromDB = async (id: string) => {
  const experience = await Experience.findByIdAndDelete(id);
  return experience;
};

export const ExperienceService = {
  createExperienceInDB,
  getAllExperienceFromDB,
  getExperienceByIdFromDB,
  updateExperienceInDB,
  deleteExperienceFromDB,
};
