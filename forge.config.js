module.exports = {
    publishers: [
      {
        name: '@electron-forge/publisher-github',
        config: {
          repository: {
            owner: 'SawyerLancer',
            name: 'electron-simple-calculator'
          },
          prerelease: false,
          draft: true
        }
      }
    ]
  }