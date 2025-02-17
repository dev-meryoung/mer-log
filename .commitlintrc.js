module.exports = {
  extends: ['@commitlint/config-conventional'],

  plugins: [
    {
      rules: {
        'subject-has-issue': (parsed) => {
          const { subject } = parsed;
          if (!subject) {
            return [false, '커밋 메시지에 설명이 없습니다.'];
          }
          return /#[0-9]+$/.test(subject)
            ? [true]
            : [
                false,
                '커밋 메시지 끝에 "#이슈번호"를 포함해야 합니다. ex: feat: OOO 기능 #7',
              ];
        },
      },
    },
  ],

  rules: {
    // 2-1) type(키워드) 허용 목록
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'docs',
        'config',
        'style',
        'refactor',
        'test',
        'chore',
        'fix',
        'hotfix',
      ],
    ],

    // 2-2) type(키워드)는 무조건 소문자
    'type-case': [2, 'always', 'lower-case'],

    // 2-3) 커밋 메시지에 “서브젝트(설명)”는 비어 있으면 안 됨
    'subject-empty': [2, 'never'],

    // 2-4) “마지막에 #이슈번호가 있어야 한다”는 커스텀 검사
    'subject-has-issue': [2, 'always'],
  },
};
