namespace Backend.Exceptions;

public class AlreadyExistsException(string message) : Exception(message);