module.exports = {
  extends: ['@commitlint/config-conventional'],

  plugins: [
    {
      rules: {
        'subject-has-issue': (parsed) => {
          const { subject } = parsed;

          if (!subject) {
            return [false, '❌ 커밋 메시지의 설명(Subject)이 없습니다.'];
          }

          // 이슈 번호 검증: "#숫자" 형식이 마지막에 포함되어야 함
          const issuePattern = /#\d+$/;
          if (!issuePattern.test(subject.trim())) {
            return [
              false,
              '❌ 커밋 메시지 끝에 "#이슈번호"를 포함해야 합니다.\n예시: feat: 새로운 기능 추가 #42',
            ];
          }

          return [true];
        },
      },
    },
  ],

  rules: {
    // ✅ 1) type(키워드) 허용 목록
    'type-enum': [
      2,
      'always',
      [
        'feat', // 새로운 기능 관련 작업
        'docs', // 문서 작업
        'config', // 프로젝트 설정 관련 작업
        'design', // UI/UX 관련 스타일 작업
        'style', // 코드 스타일 관련 작업
        'refactor', // 코드 리팩토링 작업
        'test', // 테스트 코드 관련 작업
        'chore', // 기타 작업
        'fix', // 버그 및 수정 사항 관련 작업
        'hotfix', // 치명적인 버그 수정 작업
      ],
    ],

    // ✅ 2) type(키워드)는 무조건 소문자로 작성해야 함
    'type-case': [2, 'always', 'lower-case'],

    // ✅ 3) subject(설명)는 반드시 존재해야 함
    'subject-empty': [2, 'never'],

    // ✅ 4) subject의 마지막에 #이슈번호를 포함해야 함
    'subject-has-issue': [2, 'always'],

    // ✅ 5) subject(설명)는 대소문자 제한 없이 자유롭게 작성 가능
    'subject-case': [0],
  },
};
