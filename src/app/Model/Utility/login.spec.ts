
import {TestBed, inject, waitForAsync} from '@angular/core/testing';
import { Logins } from './login';


describe('Service: App', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [Logins]
        });
    });

    it('should ...', inject([Logins], (service: Logins) => {
        expect(service).toBeTruthy();
    }));
});
