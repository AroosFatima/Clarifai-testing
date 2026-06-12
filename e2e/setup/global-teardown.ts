//  Here define - activity after execution of test suite - afterAll

const globalTeardown = async (): Promise<void> => {
  await new Promise((resolve) => {
    resolve(0);
    console.log('End of Test Suite Execution .....');
  });
};
export default globalTeardown;
