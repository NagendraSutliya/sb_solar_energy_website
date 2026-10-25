import { Mail, Phone, Award } from 'lucide-react';

const TopBar = () => {
  return (
    <div className="bg-slate-900 text-slate-300 py-2 px-4 md:px-8 text-sm hidden md:flex justify-between items-center">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <Award className="h-4 w-4 text-primary" />
          <span>ISO 9001:2015 CERTIFIED Company</span>
        </div>
      </div>
      <div className="flex items-center space-x-6">
        <a href="tel:07023204664" className="flex items-center space-x-2 hover:text-primary transition-colors">
          <Phone className="h-4 w-4 text-primary" />
          <span>+91 7023204664</span>
        </a>
        <a href="mailto:sbindustries2121@gmail.com" className="flex items-center space-x-2 hover:text-primary transition-colors">
          <Mail className="h-4 w-4 text-primary" />
          <span>sbindustries2121@gmail.com</span>
        </a>
      </div>
    </div>
  );
};


export default TopBar;