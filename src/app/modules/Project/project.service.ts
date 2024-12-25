import slugify from 'slugify';
import { Project } from './project.model';
import { IProject } from './project.interface';
import QueryBuilder from '../../builder/QueryBuilder';

const createProjectInDB = async (projectData: Partial<IProject>) => {
  const project = await Project.create({
    projectData,
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

const getProjectBySlugFrom = async (id: string) => {
  const project = await Project.findById(id);
  return project;
};

const updateProjectInDB = async (
  id: string,
  projectData: Partial<IProject>,
) => {
  const project = await Project.findByIdAndUpdate(id, projectData, {
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
