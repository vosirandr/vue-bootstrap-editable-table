module.exports = api => {
  api.cache.never()

  const presets = [
    [ '@babel/preset-env', { modules: false } ],
  ]
  const plugins = [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-default-from',
  ]

  if (process.env.NODE_ENV === 'testing') {
    plugins.push('istanbul')
  }

  return { presets, plugins, comments: false }
}
