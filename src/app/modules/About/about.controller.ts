import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AboutService } from './about.service';
import sendResponse from '../../utils/sendResponse';

const getAboutData = catchAsync(async (req, res) => {
  const result = await AboutService.getAboutDataFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'About Section Fetched Successfully',
    data: result,
  });
});

const updateAboutData = catchAsync(async (req, res) => {
  const result = await AboutService.updateAboutDataInDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'About Section Updated Successfully',
    data: result,
  });
});

const updateSection = catchAsync(async (req, res) => {
  const result = await AboutService.updateSectionInDB(
    req.body,
    req.params.section,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Section Updated Successfully',
    data: result,
  });
});

const updateSkill = catchAsync(async (req, res) => {
  const result = await AboutService.updateSkillInDB(
    req.body,
    req.params.category,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Skill Updated Successfully',
    data: result,
  });
});

export const AboutController = {
  getAboutData,
  updateAboutData,
  updateSection,
  updateSkill,
};
