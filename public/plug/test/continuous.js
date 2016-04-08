$(function () {
  "use strict";

  var self = this;


  function render() {


    // 覆盖率
    light.doget("/api/continuous/coveragesource", function (err, result) {

      var template = _.template($("#tmplCoverageSource").html())
        , table = $("#tableCoverageSource").html("");
      
      _.each(result, function (file, index) {
        file.cover = index + 30 > 100 ? 100 : index + 30;
        table.append(template(file));
      });
    });

    // 单体测试代码
    light.doget("/api/continuous/testsource", function (err, result) {

      self.test = result;
      _.each(self.test, function (file, index) {
        file.success = Math.floor(Math.random()*10)+10;
        file.failures = Math.floor(Math.random()*3);
      });

      drawUnitTest(self.test);
    });


    // API测试代码
    light.doget("/api/continuous/apisource", function (err, result) {

      var template = _.template($("#tmplApiTestSource").html())
        , table = $("#tableApiTestSource").html("");

      _.each(result, function (api) {
        api.success = 0;
        api.failures = 0;
        table.append(template(api));
      });
    });


  }

  function events() {

    $("#btnUpdatePlato").click(function () {

      light.doget("/api/continuous/unittest", function (err, result) {
        if (err) {
          return alertify.alert(err);
        }
      });

      return false;
    });

    $("#btnAdd").click(function () {
      render();
    });

    $("#btnUnitTestRun").click(function () {

      var tests = {tests: _.pluck(self.test, "file")};
      light.doget("/api/continuous/unittest", tests, function (err, result) {
        if (err) {
          return alertify.alert(err);
        }

        $("#unitLastAt").html(moment().format("YYYY/MM/DD HH:mm:ss"));
        $("#unitLastTotal").html(result.total);
        $("#unitLastFailures").html(result.failures);
        $("#unitLastSuccess").html(result.total - result.failures);

        drawUnitTest(self.test);
      });
    });

    $("#btnApiTestRun").click(function () {

    });

    $("#tableCoverageSource").on("click", "a", function() {
      var name = $(this).attr("name")
        , file = $(this).attr("file");

      // 收集测试覆盖率
      if ("collect" == name) {
        light.doget("/api/continuous/coverage", {file: file, collect: 1}, function(err, result) {

        });
      }
    })

  }

  function drawUnitTest(files) {
    var template = _.template($("#tmplUnitTestSource").html())
      , table = $("#tableUnitTestSource").html("");

    _.each(files, function (file, index) {
      file.success = Math.floor(Math.random()*10)+10;
      file.failures = Math.floor(Math.random()*3);
      table.append(template(file));
    });
  }


  // 画面表示
  render();

  // 注册事件
  events();
});