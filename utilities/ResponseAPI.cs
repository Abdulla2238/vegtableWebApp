namespace ApiCreation.utilities
{
    public class ResponseAPI<T>
    {
        public T? Value { get; set; }
        public bool? Status { get; set; }
        public string? Msg { get; set; }
    }
}
