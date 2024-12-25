import slugify from 'slugify';
import { Project } from './project.model';
import { IProject } from './project.interface';
import QueryBuilder from '../../builder/QueryBuilder';

const createProjectInDB = async (projectData: Partial<IProject>) => {
  const { title, ...rest } = projectData;
  const slug = slugify(title as string, { lower: true });
  const project = await Project.create({
    ...rest,
    title,
    slug,
  });
  return project;
};

const getAllProjectsFromDB = async (query: any) => {
  const projectQuery = new QueryBuilder(Project.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await projectQuery.modelQuery;
  const meta = await projectQuery.countTotal();

  return {
    projects: result,
    totalPages: meta.totalPage,
    currentPage: meta.page,
  };
};

const getProjectBySlugFrom = async (slug: string) => {
  const project = await Project.findOne({ slug });
  return project;
};

const updateProjectInDB = async (
  id: string,
  projectData: Partial<IProject>,
) => {
  const { title, ...rest } = projectData;
  const updateData = {
    ...rest,
    title,
    slug: title ? slugify(title as string, { lower: true }) : undefined,
  };

  const project = await Project.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
  return project;
};

const deleteProjectFromDB = async (id: string) => {
  const project = await Project.findByIdAndDelete(id);
  return project;
};

export const ProjectService = {
  createProjectInDB,
  getAllProjectsFromDB,
  getProjectBySlugFrom,
  updateProjectInDB,
  deleteProjectFromDB,
};
