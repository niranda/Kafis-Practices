using AutoMapper;
using Practice.Application.DTOs.User.Student;
using Practice.Application.DTOs.User.Teacher;
using Practice.Application.Services.Encryption;
using Practice.Domain.Core.Entities;

namespace Practice.Application.Settings
{
    class GetTeacherCredentialsAction : IMappingAction<Teacher, TeacherUserDTO>
    {
        private readonly EncryptionSettings encryptionSettings;

        public GetTeacherCredentialsAction(EncryptionSettings encryptionSettings)
        {
            this.encryptionSettings = encryptionSettings;
        }

        public void Process(Teacher source, TeacherUserDTO destination, ResolutionContext context)
        {
            destination.UserName = source.User.UserName;
            destination.Password = EncryptionService.DecryptString(source.User.PasswordHash, encryptionSettings.Key);
        }
    }

    class GetStudentCredentialsAction : IMappingAction<Student, StudentUserDTO>
    {
        private readonly EncryptionSettings encryptionSettings;

        public GetStudentCredentialsAction(EncryptionSettings encryptionSettings)
        {
            this.encryptionSettings = encryptionSettings;
        }

        public void Process(Student source, StudentUserDTO destination, ResolutionContext context)
        {
            destination.UserName = source.User.UserName;
            destination.Password = EncryptionService.DecryptString(source.User.PasswordHash, encryptionSettings.Key);
        }
    }
}
