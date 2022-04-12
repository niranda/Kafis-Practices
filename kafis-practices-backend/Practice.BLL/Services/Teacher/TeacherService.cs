﻿using AutoMapper;
using Practice.Application.DTOs.User.Teacher;
using Practice.Application.Models;
using Practice.Application.Services.UserN;
using Practice.Domain.Core.Common.Constants;
using Practice.Domain.Core.Common.Exceptions;
using Practice.Domain.Core.Entities;
using Practice.Domain.Core.Stores.Practice;
using Practice.Domain.Core.Stores.TeacherN;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Practice.Application.Services.TeacherN
{
    public class TeacherService : ITeacherService
    {
        private readonly ITeacherRepository teacherRepository;
        private readonly IPracticeDatesRepository practiceDatesRepository;
        private readonly IMapper mapper;
        private readonly IUserService userService;

        public TeacherService(ITeacherRepository teacherRepository,
                              IPracticeDatesRepository practiceDatesRepository, 
                              IMapper mapper,
                              IUserService userService)
        {
            this.practiceDatesRepository = practiceDatesRepository;
            this.teacherRepository = teacherRepository;
            this.mapper = mapper;
            this.userService = userService;
        }

        public async Task<TeacherDTO> AddTeacher(TeacherUserDTO teacherDTO)
        {
            if (teacherDTO == null)
                throw new ArgumentNullException(nameof(teacherDTO));

            teacherDTO.UserId = await userService.CreateUser(RoleNameConstants.Teacher);
            teacherDTO.PracticeDatesId = (await practiceDatesRepository.GetByGradeLevel(teacherDTO.PracticeDates.GradeLevel)).Id;

            var teacher = mapper.Map<Teacher>(teacherDTO);
            return mapper.Map<TeacherDTO>(await teacherRepository.Create(teacher));
        }

        public async Task<TeacherDTO> GetTeacherById(Guid id)
        {
            var teacher = await teacherRepository.GetById(id);

            if (teacher == null)
                throw new TeacherNotFoundException();

            return mapper.Map<TeacherDTO>(teacher);
        }

        public async Task<TeacherDTO> GetTeacherByUserId(Guid userId)
        {
            return mapper.Map<TeacherDTO>(await teacherRepository.GetByUserId(userId));
        }

        public async Task<IEnumerable<TeacherDTO>> GetAllTeachers(RunRequestParams parameters)
        {
            return mapper.Map<IEnumerable<TeacherDTO>>(await teacherRepository.GetAll(parameters.StartDate, parameters.EndDate, parameters.GradeLevel));
        }

        public async Task<IEnumerable<TeacherUserDTO>> GetAllTeachersWithCredentials(RunRequestParams parameters)
        {
            return mapper.Map<IEnumerable<TeacherUserDTO>>(await teacherRepository.GetAllWithCredentials(parameters.StartDate, parameters.EndDate, parameters.GradeLevel));
        }

        public async Task<TeacherDTO> UpdateTeacher(TeacherDTO teacherDTO)
        {
            if (teacherDTO == null)
                throw new ArgumentNullException(nameof(teacherDTO));

            return mapper.Map<TeacherDTO>(await teacherRepository.Update(mapper.Map<Teacher>(teacherDTO)));
        }

        public async Task<bool> DeleteTeacher(Guid id)
        {
            var teacherToDelete = await teacherRepository.GetById(id, false);

            if (teacherToDelete == null)
                throw new TeacherNotFoundException();

            return await teacherRepository.Delete(teacherToDelete);
        }
    }
}
