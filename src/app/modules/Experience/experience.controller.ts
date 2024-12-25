import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { ExperienceService } from './experience.service';
import sendResponse from '../../utils/sendResponse';

const getAllExperience = catchAsync(async (req, res) => {
  const result = await ExperienceService.getAllExperienceFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Experience Fetched Successfully',
    data: result,
  });
});

const createExperience = catchAsync(async (req, res) => {
  const result = await ExperienceService.createExperienceInDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Experience Created Successfully',
    data: result,
  });
});

const getExperienceById = catchAsync(async (req, res) => {
  const result = await ExperienceService.getExperienceByIdFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Experience Fetched Successfully',
    data: result,
  });
});

const updateExperience = catchAsync(async (req, res) => {
  const result = await ExperienceService.updateExperienceInDB(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Experience Updated Successfully',
    data: result,
  });
});

const deleteExperience = catchAsync(async (req, res) => {
  const result = await ExperienceService.deleteExperienceFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Experience Deleted Successfully',
    data: result,
  });
});

export const ExperienceController = {
  getAllExperience,
  createExperience,
  getExperienceById,
  updateExperience,
  deleteExperience,
};
