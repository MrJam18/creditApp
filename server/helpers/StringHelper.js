
module.exports = class StringHelper
{

    capitalizeFirst(string)
    {
    return string.charAt(0).toUpperCase() + string.slice(1);
    }

    uncapitalizeFirst(string)
    {
        return string.charAt(0).toLowerCase() + string.slice(1);
    }
}