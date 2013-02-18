using Cykel.Ember.Models;
using Cykel.Ember.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Cykel.Ember.Controllers
{
    public class StationListItemBodysController : ApiController
    {
        private readonly IDbContext _dbContext;

        public StationListItemBodysController(IDbContext dbContext)
        {
            this._dbContext = dbContext;
        }

        public StationListItemBodys Get()
        {
            return new StationListItemBodys
            {
                stationListItemBodys = this._dbContext.Stations.GetAll().Select(s => new StationListItemBodyModel { bodyText = s.name, id = s.id }).ToList()
            };
        }

        public StationListItemBody Get(string id)
        {
            var station = this._dbContext.Stations.Get(id);

            return new StationListItemBody
            {
                stationListItemBody = new StationListItemBodyModel() { bodyText = station.name, id = station.id }
            };
        }
    }
}
