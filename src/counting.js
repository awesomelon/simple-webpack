// 슬라이드시 카운팅
export default function slideCount(part, title) {
    $.ajax({
        type: 'GET',
        url: '/sstemp/counter.php',
        data: {
            id: 'saveDJ_sub_190610',
            part: part,
            title: title
        },
        dataType: 'json'
    });
}
