namespace Backend.Exceptions;

public class UserAlreadyRegistered(string message) : Exception(message);