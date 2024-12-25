import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProjectService } from './project.service';

const getAllProjects = catchAsync(async (req, res) => {
  const result = await ProjectService.getAllProjectsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Projects Fetched Successfully',
    data: result,
  });
});

const createProject = catchAsync(async (req, res) => {
  const result = await ProjectService.createProjectInDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Project Created Successfully',
    data: result,
  });
});

const getProjectBySlug = catchAsync(async (req, res) => {
  const result = await ProjectService.getProjectBySlugFrom(req.params.slug);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project Fetched Successfully',
    data: result,
  });
});

const updateProject = catchAsync(async (req, res) => {
  const result = await ProjectService.updateProjectInDB(
    req.params.slug,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project Updated Successfully',
    data: result,
  });
});

const deleteProject = catchAsync(async (req, res) => {
  const result = await ProjectService.deleteProjectFromDB(req.params.slug);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project Deleted Successfully',
    data: result,
  });
});

export const ProjectController = {
  getAllProjects,
  createProject,
  getProjectBySlug,
  updateProject,
  deleteProject,
};
