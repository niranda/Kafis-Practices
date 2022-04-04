using AutoMapper;
using Practice.Application.DTOs.Organization;
using Practice.Application.DTOs.Practice;
using Practice.Application.DTOs.User;
using Practice.Application.DTOs.User.Student;
using Practice.Application.DTOs.User.Teacher;
using Practice.Application.Models.StudentN;
using Practice.Domain.Core.Entities;

namespace Practice.Application.Settings
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<User, UserDTO>().ReverseMap();
            CreateMap<Student, StudentDTO>().ReverseMap();
            CreateMap<Student, StudentUserDTO>().AfterMap<GetStudentCredentialsAction>();
            CreateMap<StudentUserDTO, Student>();
            CreateMap<StudentOrder, StudentOrderDTO>();
            CreateMap<Teacher, TeacherDTO>().ReverseMap();
            CreateMap<Teacher, TeacherUserDTO>().AfterMap<GetTeacherCredentialsAction>();
            CreateMap<TeacherUserDTO, Teacher>();
            CreateMap<Organization, OrganizationDTO>().ReverseMap();
            CreateMap<PracticeDates, PracticeDatesDTO>().ReverseMap();
            CreateMap<Student, StudentTeacherOnlyDTO>().ForMember(
                dest => dest.StudentName,
                opt => opt.MapFrom(src => src.FullName)).ForMember(
                dest => dest.TeacherPosition,
                opt => opt.MapFrom(src => src.Teacher.Position)).ForMember(
                dest => dest.TeacherName,
                opt => opt.MapFrom(src => src.Teacher.FullName));
        }
    }
}
