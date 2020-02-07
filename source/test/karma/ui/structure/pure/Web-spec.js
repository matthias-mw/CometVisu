/* Web-spec.js 
 * 
 * copyright (c) 2010-2016, Christian Mayer and the CometVisu contributers.
 * 
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
 */


/**
 * Unit tests for web widget
 */
describe("testing a web widget", function() {

  it("should test the web creator", function() {

    var res = this.createTestWidgetString("web", {ga: 'Test'}, '<label>Test</label>');
    var widget = cv.util.String.htmlStringToDomElement(res[1]);
    expect(res[0].getPath()).toBe("id_0");
    expect(res[0].getAddress()['_Test'][0]).toBe('DPT:1.001');
    expect(res[0].getAddress()['_Test'][1]).toBe(0);

    expect(widget).toHaveClass('web');
    expect(widget).toHaveLabel('Test');

  });

  it("should test the ga with openhab backend", function() {
    var defBackend = cv.Config.backend;
    cv.Config.backend = 'oh';
    var res = this.createTestWidgetString("web", {ga: 'Test'}, '<label>Test</label>');
    expect(res[0].getAddress()['_Test'][0]).toBe('OH:switch');
    expect(res[0].getAddress()['_Test'][1]).toBe('OFF');

    cv.Config.backend = defBackend;
  });

  it("should test web update", function() {
    var engine = cv.TemplateEngine.getInstance();
    engine.visu = jasmine.createSpyObj("visu", ["write"]);
    var res = this.createTestElement("web", {
      width: '60%',
      height: '90%',
      background: '#CCC',
      frameborder: 'true',
      scrolling: "yes"
    }, "", "Test");
    expect(res.getWidth()).toBe("60%");
    expect(res.getHeight()).toBe("90%");
    expect(res.getBackground()).toBe("#CCC");
    expect(res.getFrameborder()).toBeTruthy();
    expect(res.getScrolling()).toBe("yes");

    spyOn(res, "refreshAction");
    res.update("Test", 0);
    expect(res.refreshAction).not.toHaveBeenCalled();
    res.update("Test", 1);
    expect(res.refreshAction).toHaveBeenCalled();
    expect(engine.visu.write).toHaveBeenCalledWith("Test", "80");
  });
});