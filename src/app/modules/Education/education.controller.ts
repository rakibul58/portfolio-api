import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { EducationService } from './education.service';
import catchAsync from '../../utils/catchAsync';

const getAllEducation = catchAsync(async (req, res) => {
  const result = await EducationService.getAllEducationFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Experience Fetched Successfully',
    data: result,
  });
});

const createEducation = catchAsync(async (req, res) => {
  const result = await EducationService.createEducationInDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Experience Created Successfully',
    data: result,
  });
});

const getEducationById = catchAsync(async (req, res) => {
  const result = await EducationService.getEducationByIdFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Experience Fetched Successfully',
    data: result,
  });
});

const updateEducation = catchAsync(async (req, res) => {
  const result = await EducationService.updateEducationInDB(
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

const deleteEducation = catchAsync(async (req, res) => {
  const result = await EducationService.deleteEducationFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Experience Deleted Successfully',
    data: result,
  });
});

export const EducationController = {
  getAllEducation,
  createEducation,
  getEducationById,
  updateEducation,
  deleteEducation,
};
