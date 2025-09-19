export const IsoToLocaleDate = ({iso}) => {
    const date = new Date(iso);

    const formattedDate = date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    return <span>{formattedDate}</span>;
}