/***********************
 * *Utility Function starts Here 
 ***********************/
/**
 * 
 */
function removeRowStock() {
    try {
        var stockTable = document.getElementById("stockTable");
        var leadRowCount = stockTable.rows.length;
        for (var i = 1; i < leadRowCount; i++) {
          deltrowIndex = stockTable.rows.length -1;
          stockTable.deleteRow(deltrowIndex);
        }
    } catch (e) {
      console.log("delete Row error");
      console.log("catch error"+e);
    }
  }
  /**Jquery Function to auto resize the textarea for Biling and shipping Address 
    * 
   */
  function autoResize() {
    $(".autoResizeTextArea").each(function () {
      this.setAttribute("style", "height:" + (this.scrollHeight) + "px;overflow-y:hidden;");
    }).on("input", function () {
      this.style.height = 0;
      this.style.height = (this.scrollHeight) + "px";
    });
  }
  /**
   * This function is to display the modal
   */
  function showRecentTransactionModal() {
    $('#recentTransactionModal').modal({ show: true });
    $('.modal.right, .modal-dialog').css({ "position": "fixed", "margin": "auto", "width": "100%", "height": "100%", "-webkit-transform": "translate3d(0%, 0, 0)", "-ms-transform": "translate3d(0%, 0, 0)", "-o-transform": "translate3d(0%, 0, 0)", "transform": "translate3d(0%, 0, 0)" });
    $('.modal.right, .modal-content').css({ "height": "100%", "overflow-y": "auto" });
    $('.modal.right.fade, .modal-dialog').css({ "right": "0", "-webkit-transition": "opacity 0.3s linear, right 0.3s ease-out", "-moz-transition": "opacity 0.3s linear, right 0.3s ease-out", "-o-transition": "opacity 0.3s linear, right 0.3s ease-out", "transition": "opacity 0.3s linear, right 0.3s ease-out" });
    $('.modal.right.fade.in, .modal-dialog').css({ "right": "0" });
  }

  /**
   * This function is to reset the form after submit and prevent page reload
   */
  function resetForm(){
    $("#newSalesOrder")[0].reset();
  }
  /***********************
   * *Utility Function Ends Here 
   ***********************/
  