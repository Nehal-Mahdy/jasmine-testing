import { MessagesComponentForLab } from "./messages.lab.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MessageService } from "src/app/services/message/message.service";


describe("2-message component integration testing:", () => {
    let messageComp :MessagesComponentForLab ;
    let mockMessageService: jasmine.SpyObj<MessageService>;
    let fixture: ComponentFixture<MessagesComponentForLab>;

  beforeEach(() => {
   
    mockMessageService = jasmine.createSpyObj('MessageService', ['add']) 
         
    TestBed.configureTestingModule({
        declarations: [MessagesComponentForLab],
        providers: [
          { provide: MessageService, useValue: mockMessageService }
        ]
      }); 
  
      fixture = TestBed.createComponent(MessagesComponentForLab);
      messageComp = fixture.componentInstance;
      
      mockMessageService.messages = [];
});
    it("expect comp. created successfully", () => {
        expect(messageComp).toBeTruthy();
    })
    it("expect component template to be empty", () => {
        expect(messageComp.messageService.messages.length).toBe(0);
    })
    it("then expect div.msg to have the messages after setting it", () => {
        messageComp.messageService.messages.push('message 1');
        messageComp.messageService.messages.push('message 2');
        messageComp.messageService.messages.push('message 3');
        fixture.detectChanges();
    
        const messages = fixture.nativeElement.querySelectorAll('.msg');
        expect(messages.length).toBe(3);
        expect(messages[0].textContent).toContain('message 1');
        expect(messages[1].textContent).toContain('message 2');
        expect(messages[2].textContent).toContain('message 3');
    })
})


