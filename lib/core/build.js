/**
 * Build plugin
*/

module.exports = () => {
  return {
    multiTask: true,
    name: "build-engine",
    tasks: [
      {
        task: "build",
        function: (buildup) => {

        }
      }
    ]
  };
}
