// tailwind.config.cjs
module.exports = {
  corePlugins: {
    preflight: false, // 禁止tailwindcss的默认属性
  },
  // content里面配置的是项目中需要解析的html和js以及vue等文件
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
};
